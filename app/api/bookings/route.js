import { createClient } from '../../../lib/supabase'
import { NextResponse } from 'next/server'

// Create a new booking
export async function POST(request) {
  try {
    const bookingData = await request.json()
    const supabase = createClient()

    // Validate required fields
    const requiredFields = [
      'zone_id',
      'property_id',
      'advertiser_name',
      'advertiser_email',
      'campaign_name',
      'start_date',
      'end_date'
    ]

    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate dates
    const startDate = new Date(bookingData.start_date)
    const endDate = new Date(bookingData.end_date)
    const now = new Date()

    if (startDate < now) {
      return NextResponse.json(
        { error: 'Start date cannot be in the past' },
        { status: 400 }
      )
    }

    if (endDate <= startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      )
    }

    // Check zone availability for the requested dates
    const { data: existingBookings, error: checkError } = await supabase
      .from('ar_bookings')
      .select('*')
      .eq('zone_id', bookingData.zone_id)
      .in('status', ['approved', 'active', 'pending_approval'])
      .or(
        `and(start_date.lte.${bookingData.start_date},end_date.gte.${bookingData.start_date}),` +
        `and(start_date.lte.${bookingData.end_date},end_date.gte.${bookingData.end_date}),` +
        `and(start_date.gte.${bookingData.start_date},end_date.lte.${bookingData.end_date})`
      )

    if (checkError) {
      console.error('Error checking availability:', checkError)
      return NextResponse.json(
        { error: 'Error checking zone availability' },
        { status: 500 }
      )
    }

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Zone is not available for the selected dates' },
        { status: 409 }
      )
    }

    // Prepare booking data with defaults
    const bookingRecord = {
      ...bookingData,
      status: 'pending_approval',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Create the booking using atomic transaction
    const { data: booking, error: bookingError } = await supabase
      .from('ar_bookings')
      .insert([bookingRecord])
      .select()
      .single()

    if (bookingError) {
      console.error('Error creating booking:', bookingError)
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    // Update zone status to indicate pending booking
    const { error: zoneUpdateError } = await supabase
      .from('ar_zones')
      .update({
        availability_status: 'pending',
        current_booking: {
          advertiser: bookingData.advertiser_name,
          end_date: bookingData.end_date,
          booking_id: booking.id
        },
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingData.zone_id)

    if (zoneUpdateError) {
      console.error('Error updating zone status:', zoneUpdateError)
      // Note: We don't fail the booking if zone update fails, just log it
    }

    // Return the created booking
    return NextResponse.json({
      success: true,
      booking: booking,
      message: 'Booking request submitted successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Error in booking API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get bookings (with optional filtering)
export async function GET(request) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)

    const zoneId = searchParams.get('zone_id')
    const propertyId = searchParams.get('property_id')
    const status = searchParams.get('status')
    const advertiserEmail = searchParams.get('advertiser_email')
    const limit = parseInt(searchParams.get('limit')) || 50

    let query = supabase
      .from('ar_bookings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    // Apply filters if provided
    if (zoneId) {
      query = query.eq('zone_id', zoneId)
    }

    if (propertyId) {
      query = query.eq('property_id', propertyId)
    }

    if (status) {
      query = query.eq('status', status)
    }

    if (advertiserEmail) {
      query = query.eq('advertiser_email', advertiserEmail)
    }

    const { data: bookings, error } = await query

    if (error) {
      console.error('Error fetching bookings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      bookings: bookings || [],
      count: bookings?.length || 0
    })

  } catch (error) {
    console.error('Error in GET bookings API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}