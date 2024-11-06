import React, { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import videoBg from "../../assets/video_ae_new_desktop07.mp4";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logoUnity from "../../assets/Logo_Unity-Ae_ready branco_Prancheta 1.png";

interface FormData {
  [key: string]: string;
  name: string;
  email: string;
  celular: string;
  empresa: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    celular: "",
    empresa: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        "service_d01tocr",
        "template_3ku2c5w",
        formData as Record<string, unknown>,
        "I6CDkyIieBMlS_ptU"
      );
      setSubmitStatus("Mensagem enviada com sucesso!");
      setFormData({
        name: "",
        email: "",
        celular: "",
        empresa: "",
        message: "",
      });

      setTimeout(() => {
        navigate("/calendar");
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      setSubmitStatus("Erro ao enviar mensagem. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.maincontainer}>
        <div className={styles.leftSide}>
          <div className={styles.content}>
            <video autoPlay loop muted className={styles.video}>
              <source src={videoBg} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.contactFormContainer}>
            <h2 className={styles.title}>Entre em contato</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
              <input
                type="text"
                name="celular"
                placeholder="Celular"
                value={formData.celular}
                onChange={handleChange}
                className={styles.input}
                required
              />
              <input
                type="text"
                name="empresa"
                placeholder="Empresa"
                value={formData.empresa}
                onChange={handleChange}
                className={styles.input}
                required
              />
              <textarea
                name="message"
                placeholder="Mensagem"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                required
              />
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
              {submitStatus && (
                <p className={styles.submitStatus}>{submitStatus}</p>
              )}
            </form>
            <div className={styles.footer}>
              <div className={styles.logoContainer}>
                <a
                  href="https://www.unitycomunicacao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logoUnity}
                    alt="Unity Comunicação Logo"
                    className={styles.logo}
                  />
                </a>
              </div>
              <p className={styles.copyright}>
                © Copyright 2025 Unity Comunicação. Todos os direitos
                reservados.
              </p>
              <div className={styles.socialIcons}>
                <a
                  href="https://www.instagram.com/__unitycom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100054564694262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <FaFacebookF />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
