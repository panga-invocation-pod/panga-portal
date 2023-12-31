require 'rails_helper'

RSpec.describe "invitations", type: :system do
  include ChatHelpers

  it "shows you your invitation at a unique URL" do
    invitation = create(:invitation)
    visit "/hi/#{invitation.token}#fast"

    read "Hello, is this thing on?"
    read "Am I addressing Gimli by any chance?"
  end

  it "allows you to go straight through the invitation in one go by the fastest route" do
    invitation = create(:invitation)
    create(:workshop, :panga_context_settting)

    visit "/hi/#{invitation.token}#fast"

    read "Hello, is this thing on?"
    read "Am I addressing Gimli by any chance?"
    click_on "Yes, that's me"

    read "Nice to meet you Gimli, I'm Yam Daisy."
    click_on "Nice to meet you too"

    read "My friend Frodo asked me to invite you to a workshop about Panga.\n\nThe purpose of the workshop is to give everyone a basic overview of what Panga is, so that you humans can have fun discussing collective approaches to housing together."
    expect(invitation.reload).to be_confirmed_identity

    click_on "Why me?"

    read "Panga is in it's early stages, growing slowly at the speed of trust.\n\n Frodo specifically asked me to invite you because of your interest in collective practices.\n\nHang-on, I have a personal message from them here somewhere..."
    click_on "Oh, what did they say?"

    read "I know I put it in one of these memory banks..."
    read "You should check out this awesome Panga thing"
    click_on "Ok, what are the details?"

    read "Before we start comparing diaries, it would help to know if you have any requirements to make the workshop accessible to you.\n\nFor context, the workshop will be held in person in Narrm (Melbourne), and typically has somewhere between 5-10 participants, and runs for about 2 hours. It includes both presentation and group activities.\n\nWhat do you need to be able to participate?"
    expect(invitation.reload).to be_considering_accessibility

    fill_in "Accessibility needs", with: "I need to bring my emotional support axe"
    click_on "Submit"

    read "So, to schedule the workshop, I need to know when you're available. I've got a few options here. It helps us if you can select all the times that work for you.\nSelect all suitable times"
    expect(invitation.reload).to be_considering_availability
    expect(invitation.workshop_accessibility_needs).to eq("I need to bring my emotional support axe")
  end
end