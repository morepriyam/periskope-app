// Create this as a Node.js script, e.g., create-dummy-users.js

const { createClient } = require('@supabase/supabase-js')

// Replace these with your actual Supabase URL and service_role key
const supabaseAdmin = createClient(
  'https://YOUR_PROJECT_URL.supabase.co',
  'YOUR_SERVICE_ROLE_KEY'
)

async function createConfirmedDummyUsers() {
  const dummyUsers = [
    {
      email: 'sarah_johnson@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'sarah_johnson',
        avatar_url: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
        phone: '+1 555-123-4001'
      }
    },
    {
      email: 'michael_brown@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'michael_brown',
        avatar_url: 'https://ui-avatars.com/api/?name=Michael+Brown&background=random',
        phone: '+1 555-123-4002'
      }
    },
    {
      email: 'emily_davis@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'emily_davis',
        avatar_url: 'https://ui-avatars.com/api/?name=Emily+Davis&background=random',
        phone: '+1 555-123-4003'
      }
    },
    {
      email: 'david_wilson@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'david_wilson',
        avatar_url: 'https://ui-avatars.com/api/?name=David+Wilson&background=random',
        phone: '+1 555-123-4004'
      }
    },
    {
      email: 'jennifer_martinez@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'jennifer_martinez',
        avatar_url: 'https://ui-avatars.com/api/?name=Jennifer+Martinez&background=random',
        phone: '+1 555-123-4005'
      }
    },
    {
      email: 'james_taylor@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'james_taylor',
        avatar_url: 'https://ui-avatars.com/api/?name=James+Taylor&background=random',
        phone: '+1 555-123-4006'
      }
    },
    {
      email: 'sophia_anderson@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'sophia_anderson',
        avatar_url: 'https://ui-avatars.com/api/?name=Sophia+Anderson&background=random',
        phone: '+1 555-123-4007'
      }
    },
    {
      email: 'alex_thomas@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'alex_thomas',
        avatar_url: 'https://ui-avatars.com/api/?name=Alex+Thomas&background=random',
        phone: '+1 555-123-4008'
      }
    },
    {
      email: 'olivia_jackson@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'olivia_jackson',
        avatar_url: 'https://ui-avatars.com/api/?name=Olivia+Jackson&background=random',
        phone: '+1 555-123-4009'
      }
    },
    {
      email: 'ryan_white@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'ryan_white',
        avatar_url: 'https://ui-avatars.com/api/?name=Ryan+White&background=random',
        phone: '+1 555-123-4010'
      }
    },
    {
      email: 'emma_harris@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'emma_harris',
        avatar_url: 'https://ui-avatars.com/api/?name=Emma+Harris&background=random',
        phone: '+1 555-123-4011'
      }
    },
    {
      email: 'daniel_clark@example.com',
      password: 'SecurePass123!',
      user_metadata: {
        username: 'daniel_clark',
        avatar_url: 'https://ui-avatars.com/api/?name=Daniel+Clark&background=random',
        phone: '+1 555-123-4012'
      }
    }
  ]

  console.log('Starting to create dummy users...')

  for (const user of dummyUsers) {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: user.password,
        user_metadata: user.user_metadata,
        email_confirm: true  // Pre-confirms the email
      })

      if (error) {
        console.error(`Error creating user ${user.email}:`, error)
      } else {
        console.log(`Successfully created user ${user.email} with ID ${data.user.id}`)
      }
    } catch (e) {
      console.error(`Exception while creating user ${user.email}:`, e)
    }
    
    // Add a small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log('Finished creating dummy users')
}

// Execute the function
createConfirmedDummyUsers()