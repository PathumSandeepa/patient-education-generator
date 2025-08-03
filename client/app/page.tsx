"use client";
import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { LogIn, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

function DNAHelix() {
   const helixRef = useRef<THREE.Group>(null);
   const particlesRef = useRef<THREE.Points>(null);

   const { helixGeometry, particleGeometry } = useMemo(() => {
      const helixPoints: THREE.Vector3[] = [];
      const particlePoints: THREE.Vector3[] = [];
      const turns = 3;
      const height = 8;
      const radius = 1.5;
      const segments = 200;

      for (let i = 0; i <= segments; i++) {
         const t = i / segments;
         const y = (t - 0.5) * height;
         const angle = t * turns * Math.PI * 2;

         const x1 = Math.cos(angle) * radius;
         const z1 = Math.sin(angle) * radius;
         helixPoints.push(new THREE.Vector3(x1, y, z1));

         const x2 = Math.cos(angle + Math.PI) * radius;
         const z2 = Math.sin(angle + Math.PI) * radius;
         helixPoints.push(new THREE.Vector3(x2, y, z2));

         if (i % 8 === 0) {
            const steps = 8;
            for (let s = 0; s <= steps; s++) {
               const st = s / steps;
               const x = x1 + (x2 - x1) * st;
               const z = z1 + (z2 - z1) * st;
               helixPoints.push(new THREE.Vector3(x, y, z));
            }
         }
      }

      for (let i = 0; i < 100; i++) {
         particlePoints.push(
            new THREE.Vector3(
               (Math.random() - 0.5) * 15,
               (Math.random() - 0.5) * 12,
               (Math.random() - 0.5) * 15
            )
         );
      }

      const helixGeometry = new THREE.BufferGeometry().setFromPoints(
         helixPoints
      );
      const particleGeometry = new THREE.BufferGeometry().setFromPoints(
         particlePoints
      );
      return { helixGeometry, particleGeometry };
   }, []);

   useFrame((state) => {
      if (helixRef.current) {
         helixRef.current.rotation.y = state.clock.elapsedTime * 0.3;
         helixRef.current.position.y =
            Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      }
      if (particlesRef.current) {
         particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
         particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      }
   });

   return (
      <>
         <group ref={helixRef}>
            <points geometry={helixGeometry}>
               <pointsMaterial
                  size={0.08}
                  color="#00d4ff"
                  transparent
                  opacity={0.8}
                  blending={THREE.AdditiveBlending}
                  sizeAttenuation={true}
               />
            </points>
            <points geometry={helixGeometry}>
               <pointsMaterial
                  size={0.05}
                  color="#ffffff"
                  transparent
                  opacity={1}
                  blending={THREE.AdditiveBlending}
                  sizeAttenuation={true}
               />
            </points>
         </group>

         <points ref={particlesRef} geometry={particleGeometry}>
            <pointsMaterial
               size={0.03}
               color="#64ffda"
               transparent
               opacity={0.6}
               blending={THREE.AdditiveBlending}
               sizeAttenuation={true}
            />
         </points>

         <ambientLight intensity={0.4} />
         <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
         <pointLight
            position={[-10, -10, -5]}
            intensity={0.5}
            color="#ff6b9d"
         />
      </>
   );
}

function AnimatedBackground() {
   return (
      <div className="fixed inset-0 -z-10">
         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
         <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-900/20 to-transparent" />
         <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
         </div>
      </div>
   );
}

export default function Home() {
   const [isHovered, setIsHovered] = useState(false);
   return (
      <>
         <AnimatedBackground />
         <div className="h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center px-8">
            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-6 lg:pr-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-sm font-medium backdrop-blur-sm">
                     <Sparkles className="w-4 h-4" />
                     Next-Gen Medical AI Platform
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                     <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                        Intelligent Patient
                     </span>
                     <br />
                     <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Education Hub
                     </span>
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                     Revolutionize healthcare communication with AI-powered
                     educational plans. Create personalized, evidence-based
                     content that transforms complex medical concepts into
                     clear, actionable patient guidance.
                  </p>
                  <div className="pt-4">
                     <Link
                        href="/login"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                     >
                        <LogIn className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Start Creating Plans</span>
                        <ArrowRight
                           className={`w-6 h-6 transition-transform duration-300 ${
                              isHovered ? "translate-x-1" : ""
                           }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                     </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-700/50">
                     <div className="text-center group">
                        <div className="text-3xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                           5000+
                        </div>
                        <div className="text-sm text-gray-400 font-medium">
                           Plans Generated
                        </div>
                     </div>
                     <div className="text-center group">
                        <div className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                           150+
                        </div>
                        <div className="text-sm text-gray-400 font-medium">
                           Conditions Covered
                        </div>
                     </div>
                     <div className="text-center group">
                        <div className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                           98%
                        </div>
                        <div className="text-sm text-gray-400 font-medium">
                           Accuracy Rate
                        </div>
                     </div>
                  </div>
               </div>

               <div className="relative h-[75vh] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/60 to-purple-900/60 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
                  <Canvas
                     camera={{
                        position: [0, 0, 8],
                        fov: 60,
                     }}
                     gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance",
                     }}
                  >
                     <DNAHelix />
                     <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI - Math.PI / 3}
                     />
                  </Canvas>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-slate-900/20 pointer-events-none" />

                  <div className="absolute top-6 right-6 space-y-3">
                     <div className="bg-black/50 backdrop-blur-md border border-cyan-500/40 rounded-xl p-4 text-sm text-cyan-300 shadow-lg">
                        <div className="font-bold text-base">DNA Structure</div>
                        <div className="text-gray-300 mt-1">
                           Double Helix Model
                        </div>
                     </div>
                     <div className="bg-black/50 backdrop-blur-md border border-blue-500/40 rounded-xl p-4 text-sm text-blue-300 shadow-lg">
                        <div className="font-bold text-base">Base Pairs</div>
                        <div className="text-gray-300 mt-1">A-T, G-C Bonds</div>
                     </div>
                     <div className="bg-black/50 backdrop-blur-md border border-purple-500/40 rounded-xl p-4 text-sm text-purple-300 shadow-lg">
                        <div className="font-bold text-base">AI Analysis</div>
                        <div className="text-gray-300 mt-1">
                           Pattern Recognition
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
