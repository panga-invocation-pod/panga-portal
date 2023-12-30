class AddAccessibilityNeedsToInvitation < ActiveRecord::Migration[7.1]
  def change
    add_column :invitations, :workshop_accessibility_needs, :text
  end
end
