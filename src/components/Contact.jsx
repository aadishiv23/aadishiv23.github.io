import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-4">Contact</h2>
        <p className="text-xl mb-8 text-white/80">
          Feel free to reach out to me anytime.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href="mailto:aadishiv@umich.edu"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-400 hover:opacity-80 rounded-full font-medium transition-all"
          >
            Send me an Email
          </a>
          <a
            href="https://github.com/aadishiv23"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 hover:opacity-80 rounded-full font-medium transition-all"
          >
            Visit my GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
