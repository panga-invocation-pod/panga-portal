require 'messaging/command_results/failure'

module Commands
  class SetInviteeEmail
    def call(input, context)
      invitation = context.invitation
      raise ArgumentError, "no invitation" if invitation.nil?

      invitation.set_invitee_email!(input[:email])

      return nil
    end
  end
end
