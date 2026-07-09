import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Tilt3DCard({ children, className = "" }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Set rotation range (-15deg to 15deg)
  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Normalize coordinates between 0 and 1
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`glass-panel rounded-2xl relative ${className}`}
      >
        <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
