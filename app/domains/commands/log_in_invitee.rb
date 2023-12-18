require 'messaging/command_results/failure'

module Commands
  class LogInInvitee
    def call(input, context)
      invitee = context.invitation&.invitee

      raise ArgumentError, "no invitee" if invitee.nil?

      if context.current_user && context.current_user != invitee.user
        return Messaging::CommandResults::Failure.new("already_logged_in")
      end

      if invitee.user.nil?
        invitee.create_user!(email: nil)
      end

      context.sign_in invitee.user
      return nil
    end
  end
end
