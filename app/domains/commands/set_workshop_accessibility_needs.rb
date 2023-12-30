module Commands
  class SetWorkshopAccessibilityNeeds
    def call(input, context)
      invitation = context.invitation
      raise ArgumentError unless invitation

      invitation.workshop_accessibility_needs = input[:accessibility_needs]
      invitation.accessibility_needs_recorded if invitation.may_accessibility_needs_recorded?
      invitation.save!

      return nil
    end
  end
end