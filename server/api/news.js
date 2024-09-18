import { $fetch } from 'ofetch';

export default defineEventHandler(async (event) => {
  console.log('API route hit');
  const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-08-17&sortBy=publishedAt&apiKey=1faf257ab7724e57b4500211c9067770`;

  try {
    console.log('Fetching from URL:', url);
    const response = await $fetch(url);
    console.log('API Response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching news:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch news',
      stack: error.stack,
    });
  }
});
