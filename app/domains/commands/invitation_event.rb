module Commands
  class InvitationEvent
    def call(input, context)
      invitation = context.invitation
      raise ArgumentError unless invitation

      invitation.send(input.to_sym)
      invitation.save!
    end
  end
end
