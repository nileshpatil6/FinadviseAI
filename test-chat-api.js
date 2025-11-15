// Test the financial-advice API endpoint
// Run with: node test-chat-api.js

async function testChatAPI() {
  console.log('Testing financial-advice API endpoint...\n');

  const testMessage = {
    messages: [
      {
        role: 'user',
        content: 'What are the best credit cards in India for 2025?'
      }
    ]
  };

  try {
    const response = await fetch('http://localhost:3001/api/financial-advice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ API Response successful!\n');
      console.log('Message:', data.message.substring(0, 200) + '...\n');

      if (data.sources && data.sources.length > 0) {
        console.log('✅ Grounding sources found:', data.sources.length);
        data.sources.forEach((source, idx) => {
          console.log(`  ${idx + 1}. ${source.title}`);
          console.log(`     ${source.uri}\n`);
        });
      } else {
        console.log('⚠️  No sources found (grounding may not have triggered)');
      }

      if (data.searchQueries) {
        console.log('Search queries used:', data.searchQueries);
      }
    } else {
      console.error('❌ API returned error:', data.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

testChatAPI();
