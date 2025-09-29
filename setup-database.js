const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupDatabase() {
  try {
    console.log('🚀 Setting up SpatialRights database...');

    // Read the schema file
    const schemaPath = path.join(__dirname, 'supabase-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split the schema into individual statements
    const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);

    console.log(`📝 Executing ${statements.length} SQL statements...`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (statement) {
        try {
          console.log(`Executing statement ${i + 1}/${statements.length}...`);
          const { error } = await supabase.rpc('exec_sql', { sql: statement });

          if (error) {
            console.error(`❌ Error in statement ${i + 1}:`, error.message);
            // Continue with other statements
          } else {
            console.log(`✅ Statement ${i + 1} completed`);
          }
        } catch (err) {
          console.error(`❌ Exception in statement ${i + 1}:`, err.message);
        }
      }
    }

    console.log('🎉 Database setup completed!');

    // Test the setup by querying properties
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*')
      .limit(5);

    if (error) {
      console.error('❌ Error testing database:', error);
    } else {
      console.log('✅ Database test successful!');
      console.log(`📊 Found ${properties.length} sample properties:`);
      properties.forEach(prop => {
        console.log(`   - ${prop.building_name} (${prop.city}, ${prop.state})`);
      });
    }

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Alternative approach - direct table creation
async function setupDatabaseDirect() {
  try {
    console.log('🚀 Setting up SpatialRights database (direct approach)...');

    // Create properties table
    console.log('Creating properties table...');
    const { error: propertiesError } = await supabase.rpc('create_properties_table');
    if (propertiesError) console.log('Properties table may already exist');

    // Insert sample data
    console.log('Inserting sample properties...');
    const { data, error } = await supabase
      .from('properties')
      .insert([
        {
          building_name: 'Empire State Building',
          address: '350 5th Ave',
          city: 'New York',
          state: 'NY',
          building_height_feet: 1454,
          total_facade_area_sqft: 45000,
          floors: 102,
          year_built: 1931,
          building_type: 'office',
          foot_traffic_daily: 50000,
          visibility_score: 10,
          market_tier: 1,
          owner_name: 'Empire State Realty Trust',
          owner_email: 'info@esrtreit.com',
          status: 'active'
        },
        {
          building_name: 'Times Square Billboard Building',
          address: '1 Times Square',
          city: 'New York',
          state: 'NY',
          building_height_feet: 395,
          total_facade_area_sqft: 25000,
          floors: 25,
          year_built: 1904,
          building_type: 'mixed_use',
          foot_traffic_daily: 150000,
          visibility_score: 10,
          market_tier: 1,
          owner_name: 'Jamestown Properties',
          owner_email: 'contact@jamestownlp.com',
          status: 'active'
        },
        {
          building_name: 'Apple Fifth Avenue',
          address: '767 5th Ave',
          city: 'New York',
          state: 'NY',
          building_height_feet: 32,
          total_facade_area_sqft: 8500,
          floors: 2,
          year_built: 2019,
          building_type: 'retail',
          foot_traffic_daily: 25000,
          visibility_score: 9,
          market_tier: 1,
          owner_name: 'Apple Inc.',
          owner_email: 'realestate@apple.com',
          status: 'active'
        }
      ])
      .select();

    if (error) {
      console.error('❌ Error inserting properties:', error);
    } else {
      console.log('✅ Sample properties inserted successfully!');
      console.log(`📊 Inserted ${data.length} properties`);
    }

  } catch (error) {
    console.error('❌ Direct setup failed:', error);
  }
}

if (require.main === module) {
  setupDatabaseDirect();
}

module.exports = { setupDatabase, setupDatabaseDirect };