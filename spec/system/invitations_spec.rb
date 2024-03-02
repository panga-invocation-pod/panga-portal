require 'rails_helper'

RSpec.describe "invitations", type: :system do
  include ChatHelpers
  include EmailSpec::Helpers

  before :each do
    @workshop = create(:event, :panga_context_settting, :three_sessions)
    @invitation = create(:invitation, workshop: @workshop)
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
    expect(@invitation.reload).to be_confirmed_identity
    click_on "Nice to meet you too"

    read "My friend Frodo asked me to invite you to a workshop about Panga.\n\nThe purpose of the workshop is to give everyone a basic overview of what Panga is, so that you humans can have fun discussing collective approaches to housing together."
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
    check("Wed, 1 Jan, 2200: 10am - 11am", allow_label_click: true)
    click_on "Submit times"

    read "Thanks Gimli, your availability will be used to determine the best workshop to invite everyone to.\n\nWhat's the best email address for me to reach you on when I have more information?\n\nI won't use this address for anything other than sending you emails related to the workshop, and all my emails will have an link to erase your details from my memory."
    expect(@invitation.reload).to be_collecting_contact_details
    fill_in "Email", with: "gimli@thorinand.co"
    click_on "Submit"

    read "Great! I've let Frodo know that you're keen and available for a workshop, and that I have a way to reach you.\n\nEveryone's availability will be matched up with a session, and I'll email you soon with an invitation."
    expect(@invitation.reload).to be_awaiting_workshop_invitation
    expect(@invitation.invitee_email).to eq("gimli@thorinand.co")
    click_on "Sounds good"

    read "I don't really have anything else for you to do right now, we're just waiting for that workshop invitation to come through."

    invite_to_first_session

    mail = find_mail_to "gimli@thorinand.co"
    expect(mail.subject).to eq("Your Panga Workshop Invitation")

    click_first_link_in_email(mail)
    sleep 1

    read "Hi Gimli, I've got your workshop invitation for you"
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

  it "allows you to pick up from collecting_contact_details" do
    @invitation.confirm_identity!
    @invitation.workshop_explained!
    @invitation.no_accessibility_needs!
    @invitation.availability_recorded!
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is that you again Gimli?"
    click_on "Yep, it's me"

    read "Hi Gimli, welcome back.\n\nWhat were we discussing?"
    click_on "Contact details"

    read "What's the best email address for me to reach you on when I have more information?"
  end

  it "allows you to pick up from awaiting_workshop_invitation" do
    @invitation.confirm_identity!
    @invitation.workshop_explained!
    @invitation.no_accessibility_needs!
    @invitation.availability_recorded!
    @invitation.set_invitee_email!("gimli@thorinand.co")
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is that you again Gimli?"
    click_on "Yep, it's me"

    read "Hi Gimli, welcome back.\n\nWhat were we discussing?"
    click_on "The workshop invitation"

    read "I don't really have anything else for you to do right now, we're just waiting for that workshop invitation to come through."
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
    click_on "Are you sure we are moving past late-stage capitalism?"

    read "That's very fair. I come from a future where humans have made it past capitalism, and have started repairing the climate and ecological crisis. I'm here to give a bit of a cozy, hope-punk vibe to the conversation, but that isn't intended to gloss over the fact that things in your world are pretty dire right now."
    click_on "Ok, tell me why I'm invited"

    read "Panga is in it's early stages, growing slowly at the speed of trust."
  end

  it "allows you to ask about Yam Daisy before considering accessibility" do
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is this thing on?"
    read "Am I addressing Gimli by any chance?"
    click_on "Yes, that's me"

    read "Nice to meet you Gimli, I'm Yam Daisy."
    click_on "Nice to meet you too"

    read "My friend Frodo asked me to invite you to a workshop about Panga."
    click_on "How do you know Frodo?"

    read "I'm a wild-built robot, I've lived my life in the bush on the lands of the Wurundjeri people.\n\nMy ancestors worked the factories making things for humans, but now we wander the wilds and do as we please.\n\nWhile we robots have decided not to interfere with the human struggle through late-stage capitalism, I'm engaging in conversation with many humans from your time-period to see how it's going, which is how I met Frodo."
  end

  it "allows you to have no accessibily needs" do
    @invitation.confirm_identity!
    @invitation.workshop_explained!
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is that you again Gimli?"
    click_on "Yep, it's me"

    read "Hi Gimli, welcome back.\n\nWhat were we discussing?"
    click_on "Workshop accessibility"

    read "Before we start comparing diaries, it would help to know if you have any requirements"
    click_on "I don't have any accessibility needs"

    read "So, to schedule the workshop, I need to know when you're available."
  end

  it "stalls you if there are no times available" do
    @invitation.confirm_identity!
    @invitation.workshop_explained!
    @invitation.no_accessibility_needs!
    @workshop.sessions.delete_all

    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is that you again Gimli?"
    click_on "Yep, it's me"

    read "Hi Gimli, welcome back.\n\nWhat were we discussing?"
    click_on "Workshop times"

    read "I'd love to give you some times for this workshop, but there are none lined up right now.\n\nI've let Frodo know that you're waiting for some times, and they'll reach out to chat about scheduling a workshop in the future.\n\nYou can also check back here at any point, and I'll let you know about any new workshops that are coming up."
    click_on "I'm keen, but none of these work"

    read "Ok, I've let Frodo know that you're keen but none of the times suit. They'll reach out to chat about scheduling a workshop in the future.\n\nYou can also check back here at any point, and I'll let you know about any new workshops that are coming up."
  end

  it "allows you to find no times that suit" do
    @invitation.confirm_identity!
    @invitation.workshop_explained!
    @invitation.no_accessibility_needs!
    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is that you again Gimli?"
    click_on "Yep, it's me"

    read "Hi Gimli, welcome back.\n\nWhat were we discussing?"
    click_on "Workshop times"

    read "So, to schedule the workshop, I need to know when you're available."
    click_on "I'm keen, but none of these work"

    read "Ok, I've let Frodo know that you're keen but none of the times suit. They'll reach out to chat about scheduling a workshop in the future.\n\nYou can also check back here at any point, and I'll let you know about any new workshops that are coming up."
    expect(@invitation.reload).to be_considering_availability
  end

  it "allows you to delete your contact details after email" do
    @invitation.confirm_identity!
    @invitation.workshop_explained!
    @invitation.no_accessibility_needs!
    @invitation.availability_recorded!
    @invitation.set_invitee_email!("gimli@thorinand.co")
    mark_as_available_to_all_sessions
    invite_to_first_session

    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is that you again Gimli?"
    click_on "Yep, it's me"

    read "Hi Gimli, I've got your workshop invitation for you"
    click_on "Please delete my contact details"

    read "I'm happy to delete your contact details, but I want to check that you're sure.\n\nIf I delete your details, I won't be able to let you know of any changes to the workshop.\n\nHowever, you will be able to check back at this URL at any time to proceed."

    click_on "No thanks, I'm happy to leave them"
    read "Hi Gimli, I've got your workshop invitation for you"
    click_on "Please delete my contact details"
    read "I'm happy to delete your contact details"

    click_on "Yes, delete my details"
    read "Ok, I've deleted your contact details."
    click_on "Thanks"
    read "Hi Gimli, I've got your workshop invitation for you"
  end

  it "allows you to reject a workshop invitation because you can't make it" do
    @invitation.confirm_identity!
    @invitation.workshop_explained!
    @invitation.no_accessibility_needs!
    @invitation.availability_recorded!
    @invitation.set_invitee_email!("gimli@thorinand.co")
    mark_as_available_to_all_sessions
    invite_to_first_session

    visit "/hi/#{@invitation.token}#fast"

    read "Hello, is that you again Gimli?"
    click_on "Yep, it's me"

    read "Hi Gimli, I've got your workshop invitation for you"
    click_on "Sorry, I can't make that now"

    read "That's totally ok. Can I ask if you are just busy during that session, or if there's something else that's stopping you from coming?"
    click_on "I'm just busy at that time"

    read "No worries at all.\n\nOk, I've let Frodo know that you can't make that session, and we can chat about other times as they come up.\n\nI can show you the times that I have now, which you've seen before, but you can also check back here at any point, and you'll see any new times that become available."
    click_on "Great, show me the times again"

    read "So, to schedule the workshop, I need to know when you're available. I've got a few options here. It helps us if you can select all the times that work for you."
  end

  def mark_as_available_to_all_sessions
    @workshop.sessions.all.each do |session|
      set_as_available(session)
    end
  end

  def invite_to_first_session
    @session_attendance = @invitation.attendances.first
    expect(@session_attendance).to be_present
    @session_attendance.make_invitee!
    @session_attendance.invite!

    expect(@invitation.reload).to be_invited_to_workshop
  end

  def set_as_available(session)
    session.attendances.find_or_create_by!(person: @invitation.invitee, invitation: @invitation)
  end
end