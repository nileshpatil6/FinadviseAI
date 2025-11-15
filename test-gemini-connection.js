// Quick test script to verify Gemini API connection
// Run with: node test-gemini-connection.js

const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testBasicConnection() {
  console.log('Testing basic Gemini API connection...\n');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in environment variables');
    process.exit(1);
  }

  console.log('✓ API key found');
  console.log('Key preview:', apiKey.substring(0, 10) + '...\n');

  const genAI = new GoogleGenerativeAI(apiKey);

  // Test 1: Basic API call without grounding
  console.log('Test 1: Basic API call (no grounding)...');
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent('Say hello in one word');
    const response = await result.response;
    console.log('✓ Basic API works!');
    console.log('Response:', response.text(), '\n');
  } catch (error) {
    console.error('❌ Basic API failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }

  // Test 2: API call with grounding
  console.log('Test 2: API call with Google Search grounding...');
  try {
    const model = genAI.getGenerativeModel(
      {
        model: 'gemini-2.5-flash',
        tools: [{ googleSearch: {} }],
      },
      { apiVersion: 'v1beta' }
    );

    const result = await model.generateContent('What is the current time in New York?');
    const response = await result.response;
    console.log('✓ Grounding API works!');
    console.log('Response:', response.text());

    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    if (groundingMetadata?.webSearchQueries) {
      console.log('\n✓ Search queries used:', groundingMetadata.webSearchQueries);
    }
    if (groundingMetadata?.groundingChunks?.length) {
      console.log('✓ Sources found:', groundingMetadata.groundingChunks.length);
    }
  } catch (error) {
    console.error('❌ Grounding API failed:', error.message);

    if (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
      console.error('\n⚠️  This indicates you need a PAID Google Cloud account to use grounding.');
      console.error('   Grounding costs $35 per 1,000 queries.');
      console.error('   See: https://ai.google.dev/gemini-api/docs/google-search');
    }

    if (error.message.includes('fetch failed')) {
      console.error('\n⚠️  Network connection issue. Check:');
      console.error('   1. Internet connection');
      console.error('   2. Firewall/proxy settings');
      console.error('   3. Google API endpoint accessibility');
    }

    console.error('\nFull error:', error);
    process.exit(1);
  }

  console.log('\n✅ All tests passed! Your API is configured correctly.');
}

testBasicConnection().catch(console.error);
