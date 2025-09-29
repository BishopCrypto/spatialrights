import { createClient } from '../../../../lib/supabase'
import { NextResponse } from 'next/server'

// Get a specific booking by ID
export async function GET(request, { params }) {
  try {
    const supabase = createClient()
    const bookingId = params.id

    // Fetch booking with related zone and property data
    const { data: booking, error: bookingError } = await supabase
      .from('ar_bookings')
      .select(`
        *,
        ar_zones:zone_id (
          id,
          zone_name,
          width_feet,
          height_feet,
          square_footage,
          visibility_score,
          traffic_exposure_score,
          base_price_monthly,
          premium_multiplier,
          zone_type
        ),
        properties:property_id (
          id,
          building_name,
          address,
          city,
          state,
          owner_name,
          building_type
        )
      `)
      .eq('id', bookingId)
      .single()

    if (bookingError) {
      if (bookingError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }

      console.error('Error fetching booking:', bookingError)
      return NextResponse.json(
        { error: 'Failed to fetch booking' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      booking: booking
    })

  } catch (error) {
    console.error('Error in GET booking API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update a booking (for status changes, etc.)
export async function PATCH(request, { params }) {
  try {
    const supabase = createClient()
    const bookingId = params.id
    const updateData = await request.json()

    // Add updated timestamp
    updateData.updated_at = new Date().toISOString()

    const { data: booking, error } = await supabase
      .from('ar_bookings')
      .update(updateData)
      .eq('id', bookingId)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }

      console.error('Error updating booking:', error)
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      )
    }

    // If status is being changed to approved/rejected, update zone availability
    if (updateData.status) {
      let zoneStatus = 'available'
      let currentBooking = null

      if (updateData.status === 'approved' || updateData.status === 'active') {
        zoneStatus = 'booked'
        currentBooking = {
          advertiser: booking.advertiser_name,
          end_date: booking.end_date,
          booking_id: booking.id
        }
      }

      const { error: zoneUpdateError } = await supabase
        .from('ar_zones')
        .update({
          availability_status: zoneStatus,
          current_booking: currentBooking,
          updated_at: new Date().toISOString()
        })
        .eq('id', booking.zone_id)

      if (zoneUpdateError) {
        console.error('Error updating zone status:', zoneUpdateError)
      }
    }

    return NextResponse.json({
      success: true,
      booking: booking,
      message: 'Booking updated successfully'
    })

  } catch (error) {
    console.error('Error in PATCH booking API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Delete a booking
export async function DELETE(request, { params }) {
  try {
    const supabase = createClient()
    const bookingId = params.id

    // First get the booking to know which zone to update
    const { data: booking, error: fetchError } = await supabase
      .from('ar_bookings')
      .select('zone_id')
      .eq('id', bookingId)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }

      console.error('Error fetching booking for deletion:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch booking' },
        { status: 500 }
      )
    }

    // Delete the booking
    const { error: deleteError } = await supabase
      .from('ar_bookings')
      .delete()
      .eq('id', bookingId)

    if (deleteError) {
      console.error('Error deleting booking:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete booking' },
        { status: 500 }
      )
    }

    // Update zone to available status
    const { error: zoneUpdateError } = await supabase
      .from('ar_zones')
      .update({
        availability_status: 'available',
        current_booking: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', booking.zone_id)

    if (zoneUpdateError) {
      console.error('Error updating zone status after deletion:', zoneUpdateError)
    }

    return NextResponse.json({
      success: true,
      message: 'Booking deleted successfully'
    })

  } catch (error) {
    console.error('Error in DELETE booking API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}