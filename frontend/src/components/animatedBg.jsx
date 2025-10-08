import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <motion.div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(270deg, #ff7e5f, #feb47b)",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%"], // gradient shift
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {/* Your content here */}
    </motion.div>
  );
};

export default AnimatedBackground;
