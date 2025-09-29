const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function loadComprehensiveData() {
  try {
    console.log('🚀 Loading comprehensive SpatialRights database...');

    // Read the comprehensive data script
    const sqlPath = path.join(__dirname, 'comprehensive-data-load.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');

    console.log('📄 SQL script loaded, executing...');

    // For now, let's try a simpler approach by executing parts directly
    console.log('🏢 Creating properties...');

    // First, let's test if we can connect and query
    const { data: testQuery, error: testError } = await supabase
      .from('properties')
      .select('count')
      .limit(1);

    if (testError) {
      console.log('⚠️  Properties table might not exist yet. Creating tables first...');

      // Execute the schema first if tables don't exist
      const schemaPath = path.join(__dirname, 'supabase-schema.sql');
      if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, 'utf8');
        console.log('📋 Schema found, but cannot execute complex SQL via client...');
        console.log('📝 Please execute the SQL files manually in Supabase SQL editor:');
        console.log('   1. First run: supabase-schema.sql');
        console.log('   2. Then run: comprehensive-data-load.sql');
        console.log('');
        console.log('Or use the Supabase dashboard SQL editor to execute these files.');
        return;
      }
    }

    // If tables exist, try to get current count
    const { data: currentData, error: countError } = await supabase
      .from('properties')
      .select('id', { count: 'exact' });

    if (!countError) {
      console.log(`✅ Connected to Supabase successfully!`);
      console.log(`📊 Current properties in database: ${currentData.length}`);

      if (currentData.length === 0) {
        console.log('📝 Database is empty. Please execute the SQL files in Supabase dashboard:');
        console.log('   1. Go to Supabase dashboard SQL editor');
        console.log('   2. Copy and paste comprehensive-data-load.sql');
        console.log('   3. Execute the script');
        console.log('');
        console.log('This will create 30+ properties with 100+ AR zones and 50+ bookings.');
      } else {
        // Show some sample data
        const { data: sampleProperties } = await supabase
          .from('properties')
          .select('building_name, city, owner_name')
          .limit(5);

        console.log('🏢 Sample properties in database:');
        sampleProperties.forEach(prop => {
          console.log(`   - ${prop.building_name} (${prop.city}) - ${prop.owner_name}`);
        });

        const { data: zones } = await supabase
          .from('ar_zones')
          .select('id', { count: 'exact' });

        const { data: bookings } = await supabase
          .from('bookings')
          .select('id', { count: 'exact' });

        console.log(`📍 AR Zones: ${zones?.length || 0}`);
        console.log(`📅 Bookings: ${bookings?.length || 0}`);
      }
    }

    console.log('');
    console.log('🎯 Next steps:');
    console.log('   1. Execute SQL scripts in Supabase dashboard');
    console.log('   2. Build property detail pages');
    console.log('   3. Create booking interface');
    console.log('   4. Add investment products section');

  } catch (error) {
    console.error('❌ Error:', error.message);

    console.log('');
    console.log('💡 Manual setup instructions:');
    console.log('   1. Open Supabase dashboard');
    console.log('   2. Go to SQL Editor');
    console.log('   3. Execute supabase-schema.sql first');
    console.log('   4. Then execute comprehensive-data-load.sql');
    console.log('   5. This will create the full marketplace data');
  }
}

if (require.main === module) {
  loadComprehensiveData();
}

module.exports = { loadComprehensiveData };