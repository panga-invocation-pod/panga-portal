require 'rails_helper'

RSpec.describe "invitations", type: :system do
  it "shows you your invitation at a unique URL" do
    invitation = create(:invitation)

    visit "/hi/#{invitation.token}"
  end
end