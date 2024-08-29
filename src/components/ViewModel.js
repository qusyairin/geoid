import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';

function Loader() {
    const { progress } = useProgress();
    const progressPercentage = Math.round(progress); // Round progress to the nearest whole number
    return (
        <Html center style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: 10
        }}>
            <span style={{ whiteSpace: 'nowrap' }}>
                Loading 3D Model
            </span>
            <span>
                {progressPercentage}%
            </span>
        </Html>
    );
}

function Model({ model, onSizeReady, ...props }) {
    const gltf = useGLTF(model); // Load the GLTF model
    const ref = useRef();

    useEffect(() => {
        // Center the model using a bounding box helper
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        gltf.scene.position.x += (gltf.scene.position.x - center.x);
        gltf.scene.position.y += (gltf.scene.position.y - center.y);
        gltf.scene.position.z += (gltf.scene.position.z - center.z);

        if (onSizeReady) {
            onSizeReady(size);
        }
    }, [gltf, onSizeReady]);

    return <primitive object={gltf.scene} ref={ref} {...props} />;
}

function ViewModel() {
    const location = useLocation();
    const { model, data } = location.state || {}; // Get the model and data from state
    const [size, setSize] = useState(new THREE.Vector3(1, 1, 1)); // Default size
    const controlsRef = useRef();
    const containerRef = useRef();

    useEffect(() => {
        if (controlsRef.current) {
            controlsRef.current.zoomSpeed = 4; // Adjust this value to change zoom speed
        }
    }, [controlsRef]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (document.fullscreenElement) {
                // Update container style when entering fullscreen
                if (containerRef.current) {
                    containerRef.current.style.position = 'fixed';
                    containerRef.current.style.top = '0';
                    containerRef.current.style.left = '0';
                    containerRef.current.style.width = '100vw';
                    containerRef.current.style.height = '100vh';
                    containerRef.current.style.zIndex = '1000'; // Ensure it is above other elements
                }
            } else {
                // Reset container style when exiting fullscreen
                if (containerRef.current) {
                    containerRef.current.style.position = 'relative';
                    containerRef.current.style.width = '100%';
                    containerRef.current.style.height = '550px'; // Or the original height
                    containerRef.current.style.zIndex = 'auto'; // Reset z-index
                }
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    if (!model) {
        return <p>No model provided.</p>;
    }

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '550px',
                borderRadius: '10px',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                overflow: 'hidden', // Ensure no overflow issues
            }}
        >
            <Canvas
                camera={{ position: [0, 0, size.z * 2], fov: 75 }} // Position the camera based on the model's size
                style={{ background: '#e0e0e0', width: '100%', height: '100%' }} // Ensure the canvas fills its container
            >
                <Suspense fallback={<Loader />}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 5, 5]} intensity={1} />
                    <Model model={model} position={[0, 0, 0]} scale={0.5} onSizeReady={setSize} />
                    <OrbitControls ref={controlsRef} enableZoom={true} target={[0, 0, 0]} />
                </Suspense>
            </Canvas>
            {/* Menu buttons for Fullscreen, Annotations, etc. */}
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', gap: '10px' }}>
                <button
                    onClick={() => document.querySelector('canvas').requestFullscreen()}
                    style={buttonStyle}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

const buttonStyle = {
    background: '#fff',
    border: '1px solid #ccc',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
};

export default ViewModel;
