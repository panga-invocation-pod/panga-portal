FactoryBot.define do
  factory :person do
    trait :frodo do
      short_name { 'Frodo' }
      full_name { 'Frodo Baggins' }
    end

    trait :gimli do
      short_name { 'Gimli' }
      full_name { 'Gimli son of Gloin' }
    end
  end

  factory :invitation do
    inviter { create(:person, :frodo) }
    invitee { create(:person, :gimli) }
    message { 'You should check out this awesome Panga thing' }
  end

  factory :workshop do
    trait :panga_context_settting do
      name { 'Panga Context Setting' }
    end
  end
end