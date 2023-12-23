module Commands
  class InvitationEvent
    def call(input, context)
      invitation = context.invitation
      raise ArgumentError unless invitation

      raise NotImplementedError, "not implemented yet, got input #{input.inspect} and invitation #{invitation.inspect}"
    end
  end
end
