import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_summary_email(to_email: str, summary: str):
    """
    Sends the generated sales summary via email using SMTP.
    """
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    sender_email = os.getenv("SMTP_EMAIL")
    sender_password = os.getenv("SMTP_PASSWORD")
    
    if not sender_email or not sender_password:
        raise ValueError("SMTP_EMAIL and SMTP_PASSWORD environment variables must be set.")

    # Prepare message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = "Your Executive Sales Summary"
    
    # Attach the text summary
    msg.attach(MIMEText(summary, 'plain'))
    
    # Send email
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
    except smtplib.SMTPAuthenticationError:
        raise RuntimeError("SMTP Authentication Failed. Check your email and app password.")
    except Exception as e:
        raise RuntimeError(f"Failed to send email: {str(e)}")
