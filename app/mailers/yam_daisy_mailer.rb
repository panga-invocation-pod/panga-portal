class YamDaisyMailer < ApplicationMailer
  default from: 'yamdaisy@panga.network'

  def test_email
    mail(to: params[:to], subject: 'Test email')
  end
end
