class YamDaisyMailer < ApplicationMailer
  default from: 'yamdaisy@panga.network'

  def test_email
    mail(to: params[:to], subject: 'Test email')
  end

  def first_workshop_invite
    raise ArgumentError, 'Invitation ID is required' unless params[:invitation_id].present?
    @invitation = Invitation.find(params[:invitation_id])

    raise ArgumentError, 'Invitation does not have address' unless @invitation.invitee_email.present?

    mail(to: @invitation.invitee_email, subject: 'Your Panga Workshop Invitation')
  end
end
