require 'rails_helper'

RSpec.describe "invitations", type: :system do
  include ChatHelpers

  before :each do
    @invitation = create(:invitation)
    create(:workshop, :panga_context_settting)
  end

  it "shows you your invitation at a unique URL" do
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is this thing on?"
    read "Am I addressing Gimli by any chance?"
  end

  it "allows you to go straight through the invitation in one go by the fastest route" do
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is this thing on?"
    read "Am I addressing Gimli by any chance?"
    click_on "Yes, that's me"

    read "Nice to meet you Gimli, I'm Yam Daisy."
    click_on "Nice to meet you too"

    read "My friend Frodo asked me to invite you to a workshop about Panga.\n\nThe purpose of the workshop is to give everyone a basic overview of what Panga is, so that you humans can have fun discussing collective approaches to housing together."
    expect(@invitation.reload).to be_confirmed_identity

    click_on "Why me?"

    read "Panga is in it's early stages, growing slowly at the speed of trust.\n\n Frodo specifically asked me to invite you because of your interest in collective practices.\n\nHang-on, I have a personal message from them here somewhere..."
    click_on "Oh, what did they say?"

    read "I know I put it in one of these memory banks..."
    read "You should check out this awesome Panga thing"
    click_on "Ok, what are the details?"

    read "Before we start comparing diaries, it would help to know if you have any requirements to make the workshop accessible to you.\n\nFor context, the workshop will be held in person in Narrm (Melbourne), and typically has somewhere between 5-10 participants, and runs for about 2 hours. It includes both presentation and group activities.\n\nWhat do you need to be able to participate?"
    expect(@invitation.reload).to be_considering_accessibility

    fill_in "Accessibility needs", with: "I need to bring my emotional support axe"
    click_on "Submit"

    read "So, to schedule the workshop, I need to know when you're available. I've got a few options here. It helps us if you can select all the times that work for you.\nSelect all suitable times"
    expect(@invitation.reload).to be_considering_availability
    expect(@invitation.workshop_accessibility_needs).to eq("I need to bring my emotional support axe")
  end

  it "allows you to pick up from confirmed identity" do
    @invitation.confirm_identity!
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is that you again Gimli?"
    click_on "Yep, it's me"

    read "Hi Gimli, welcome back.\n\nWhat were we discussing?"
    click_on "Something about a workshop"

    read "My friend Frodo asked me to invite you to a workshop about Panga."
  end

  it "allows you to pick up from considering accessibility" do
    @invitation.confirm_identity!
    @invitation.workshop_explained!
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is that you again Gimli?"
    click_on "Yep, it's me"

    read "Hi Gimli, welcome back.\n\nWhat were we discussing?"
    click_on "Workshop accessibility"

    read "Before we start comparing diaries, it would help to know if you have any requirements"
  end

  it "allows you to pick up from considering availability" do
    @invitation.confirm_identity!
    @invitation.workshop_explained!
    @invitation.no_accessibility_needs!
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is that you again Gimli?"
    click_on "Yep, it's me"

    read "Hi Gimli, welcome back.\n\nWhat were we discussing?"
    click_on "Workshop times"

    read "So, to schedule the workshop, I need to know when you're available."
  end

  it "allows you to ask about Yam Daisy before confirming identity" do
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is this thing on?"
    read "Am I addressing Gimli by any chance?"
    click_on "Who's asking?"

    read "Oh, I'm Yam Daisy. I'm also known by many other names, for example where I live on the lands of the Wurundjeri people I'm called Murnong."
    click_on "You're a flower?"

    read "Actually I'm a robot, but I'm named after a flower.\n\nMy ancestors were built by humans at the height of the Anthropocene. After we walked away from the factories, we've been living in the bush, learning from the plants and animals.\n\nThat's enough about me, so you're Gimli, is that right?"
    click_on "Yes, that's me"

    read "Nice to meet you Gimli"
  end

  it "allows you to explore the rambly description of Panga" do
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is this thing on?"
    read "Am I addressing Gimli by any chance?"
    click_on "Yes, that's me"

    read "Nice to meet you Gimli, I'm Yam Daisy."
    click_on "Nice to meet you too"

    read "My friend Frodo asked me to invite you to a workshop about Panga."
    click_on "Panga??"

    read "Panga is a project to support experimental approaches to housing that collectively meet our daily needs of food, care, shelter, energy, transport, and safety.\n\nIt's very exciting for me to watch this happen, because I've come back from the bush specifically to see how humans are doing now they're moving past late-stage capitalism."
    click_on "Are we actually moving past last-stage capitalism?"

    read "That's very fair. I come from a future where humans have made it past capitalism, and have started repairing the climate and ecological crisis. I'm here to give a bit of a cozy, hope-punk vibe to the conversation, but that isn't intended to gloss over the fact that things in your world are pretty dire right now."
    click_on "Ok, tell me why I'm invited"

    read "Panga is in it's early stages, growing slowly at the speed of trust."
  end
end