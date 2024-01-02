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

    trait :three_sessions do
      after(:create) do |workshop|
        create(:workshop_session, :first, workshop: workshop)
        create(:workshop_session, :second, workshop: workshop)
        create(:workshop_session, :third, workshop: workshop)
      end
    end
  end

  factory :workshop_session do
    start_at { 7.days.from_now }
    duration_minutes { 60 }

    trait :first do
      start_at { Time.zone.parse("2200-01-01 10:00") }
    end

    trait :second do
      start_at { Time.zone.parse("2200-01-02 10:00")}
    end

    trait :third do
      start_at { Time.zone.parse("2200-01-03 10:00") }
    end
  end
end