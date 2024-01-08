module Commands
  class DeleteContactDetails
    def call(input, context)
      invitation = context.invitation
      raise ArgumentError, "no invitation" if invitation.nil?

      invitation.delete_contact_details!

      return nil
    end
  end
end
