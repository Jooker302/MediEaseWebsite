/** @type {import('next').NextConfig} */
const nextConfig = { 
  experimental: {
    serverComponentsExternalPackages: ['tesseract.js'],
    
  },
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  // maxDuration: 5,
}

module.exports = nextConfig
