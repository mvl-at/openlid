# OpenLid Multi-Arch Docker Image

## Description
The OpenLid Multi-Arch Docker Image is designed to build and run the 'openlid' application on multiple architectures.
This Docker image leverages the power of Rust and Alpine Linux to provide a lightweight and efficient environment for hosting OpenLid.
The image supports both ARM64 and AMD64 architectures, making it versatile and suitable for various deployment scenarios.

## Features
- Supports ARM64 and AMD64 architectures for broader compatibility.
- Based on Angular, Nginx and Alpine Linux, ensuring a lightweight and efficient container environment.
- Built-in multi-stage build process for optimal image size and security.
- Automatically exposes port 80 for incoming connections.

## Usage
To use the OpenLid Multi-Arch Docker Image, follow these steps:

1. Pull the Docker image:
   ```sh
   docker pull mvlat/openlid:latest
   ```
1. Run the container with the desired configuration:
   ```sh
   docker run -d -p 80:80 -v /path/to/configuration.json:/openlid/assets/configuration.json mvlat/openlid
   ```
The `-p` flag maps port 1926 inside the container to the host, enabling incoming connections.
The `-v` flag allows you to mount a host directory as a volume for persistent data storage.

## Build Configuration:
The build process is designed to be versatile, allowing you to specify the target architecture during the build.
To build the image for a specific architecture, use the following command:

```sh
docker buildx build -t mvlat/openlid:latest --platform=linux/amd64 --platform=linux/arm64 --progress=plain . --push
```

## Authors:

- Richard Stöckl (GitHub: @Eiskasten)

Note:
This Docker image is continuously maintained and updated by the community to ensure compatibility with the latest versions of Angular and Alpine Linux.
Contributions and feedback are welcome via GitHub.
Happy OpenLiding! 🍻
