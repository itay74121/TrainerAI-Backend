import natUpnp from 'nat-upnp';

/**
 * Requests port forwarding for a specific IP and port on the local network.
 *
 * @param {string} internalIP - The internal IP address of the device on the local network.
 * @param {number} internalPort - The internal port on the device.
 * @param {number} externalPort - The external port to expose on the router.
 * @param {string} protocol - The protocol to use, either 'TCP' or 'UDP'.
 * @param {number} ttl - The time-to-live for the port mapping in minutes.
 * @param {function} callback - A callback function to handle the result.
 */
export async function requestPortForwarding(internalIP, internalPort, externalPort, protocol, ttl = 10, callback) {
  const client = natUpnp.createClient();

  // Request port forwarding for the specific device
  await client.portMapping({
    public: externalPort,  // The external port on the router to expose
    private: internalPort, // The local port on your device
    ttl: ttl,              // Time-to-live in minutes
    protocol: protocol,    // The protocol ('TCP' or 'UDP')
    internalIp: internalIP // The internal IP of the device
  }, (err) => {
    if (err) {
      console.log(`Error setting up port forwarding: ${err}`);
    } else {
      console.log(null, `Port forwarding successfully set up: ${protocol} ${externalPort} -> ${internalIP}:${internalPort}`);
    }
  });

  // Clean up when done
  process.on('exit', () => {
    client.close();
  });
}


