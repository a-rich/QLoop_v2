import smtplib
import email.utils
from email.mime.text import MIMEText

def send_email(user_email, subject, html):
    """
        Sends an account activation email to the user.
    """

    msg = MIMEText(html, 'html')
    msg['To'] = email.utils.formataddr(('Recipient', user_email))
    msg['From'] = email.utils.formataddr(('QLoop', 'qloop.signup@gmail.com'))
    msg['Subject'] = subject

    server = smtplib.SMTP('smtp.gmail.com', 587)
    try:
        server.starttls()
        server.login('qloop.signup@gmail.com', ')F}Uw2B[)zDy8.{z')
        server.sendmail('qloop.signup@gmail.com', user_email, msg.as_string())
    finally:
        server.quit()


def allowed_file(filename):
    allowed_extensions = set(['png', 'jpg', 'jpeg', 'gif'])
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions
