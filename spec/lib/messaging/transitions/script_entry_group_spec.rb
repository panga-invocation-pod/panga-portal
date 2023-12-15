require 'spec_helper'
require 'messaging/transitions/to_message'
require 'messaging/message'

module Messaging
  module Transitions
    describe ScriptEntryGroup do
      describe 'transition_for' do
        it 'returns the first one in the simple case' do
          subject = ScriptEntryGroup.from_data(["foo", "bar"])
          result = subject.transition_for(input: nil)

          expect(result.target_message_id).to eq("foo")
        end

        it 'returns the first one in the simple case using object structure' do
          subject = ScriptEntryGroup.from_data([{ "target" => "foo"}, "bar"])
          result = subject.transition_for(input: nil)

          expect(result.target_message_id).to eq("foo")
        end
      end
    end
  end
end
