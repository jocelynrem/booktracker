import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';

const ScanISBN = ({ onDetected }) => {
    const [scanning, setScanning] = useState(false);
    const scannerRef = useRef(null);

    const startScanner = () => {
        setScanning(true);
        Quagga.init({
            inputStream: {
                type: "LiveStream",
                target: scannerRef.current
            },
            decoder: {
                readers: ["ean_reader"]
            }
        }, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected((data) => {
            onDetected(data.codeResult.code);
            stopScanner();
        });
    };

    const stopScanner = () => {
        Quagga.stop();
        setScanning(false);
    };

    useEffect(() => {
        return () => {
            if (scanning) {
                Quagga.stop();
            }
        };
    }, [scanning]);

    return (
        <div>
            <div ref={scannerRef} style={{ width: "100%", display: scanning ? "block" : "none" }} />
            <button onClick={scanning ? stopScanner : startScanner}>
                {scanning ? "Stop Scanning" : "Start Scanning"}
            </button>
        </div>
    );
};

export default ScanISBN;
