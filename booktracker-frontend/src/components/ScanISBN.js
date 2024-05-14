import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
import Button from './Button';

const ScanISBN = ({ onDetected, scanning, setScanning }) => {
    const scannerRef = useRef(null);

    const startScanner = () => {
        setScanning(true);
        Quagga.init({
            inputStream: {
                type: "LiveStream",
                target: scannerRef.current,
                constraints: {
                    width: 400, // Set desired width
                    height: 300, // Set desired height
                },
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
        <div className="flex flex-col items-right">
            <Button
                type="button"
                onClick={scanning ? stopScanner : startScanner}
                icon={scanning ? MinusIcon : PlusIcon}
            >
                {scanning ? "Stop Scanner" : "Start Scanner"}
            </Button>
            <div
                ref={scannerRef}
                className="w-full mt-2"
                style={{
                    display: scanning ? 'flex' : 'none',
                    width: '270px', // Set fixed width
                    height: '200px', // Set fixed height
                    border: '1px solid #ccc', // Optional: Add border for better visibility
                    marginTop: '10px', // Add some space between the button and the scanner
                }}
            />
        </div>
    );
};

export default ScanISBN;
