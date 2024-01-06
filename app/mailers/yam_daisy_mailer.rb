class YamDaisyMailer < ApplicationMailer
  default from: 'yamdaisy@panga.network'

  def test_email
    mail(to: params[:to], subject: 'Test email')
  end

  def first_workshop_invite
    @invitation = Invitation.find(params[:invitation_id])
    mail(to: @invitation.invitee_email, subject: 'Your Panga Workshop Invitation')
  end
end
