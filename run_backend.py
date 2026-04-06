#!/usr/bin/env python3
"""
Cattle Health Monitoring System Backend
Run this script to start the FastAPI server
"""

import uvicorn
import os
import sys

def main():
    # Change to the backend directory
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(backend_dir)
    
    print("🐄 Starting Cattle Health Monitoring System Backend...")
    print("📍 Backend directory:", backend_dir)
    print("🌐 Server will be available at: http://127.0.0.1:8000")
    print("📚 API documentation at: http://127.0.0.1:8000/docs")
    print("🔄 Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        # Run the FastAPI server
        uvicorn.run(
            "main1:app",
            host="127.0.0.1",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
