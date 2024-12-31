import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-dark text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold gradient-text">Contact</h2>
        <p className="text-xl mt-4 text-white/80">
          Feel free to reach out to me anytime.
        </p>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href="mailto:aadishiv@umich.edu"
            className="px-8 py-4 bg-primary hover:bg-primary/80 rounded-full font-medium transition-colors duration-300"
          >
            Send me an Email
          </a>
          <a
            href="https://github.com/aadishiv23"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-secondary hover:bg-secondary/80 rounded-full font-medium transition-colors duration-300"
          >
            Visit my GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
