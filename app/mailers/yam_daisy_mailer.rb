class YamDaisyMailer < ApplicationMailer
  def test_email
    mail(to: params[:to], subject: 'Test email')
  end
end
