module Commands
  class InvitationAppendNote
    def call(input, context)
      invitation = context.invitation
      raise ArgumentError unless invitation

      invitation.append_note(input[:text])
      invitation.save!

      nil
    end
  end
end
