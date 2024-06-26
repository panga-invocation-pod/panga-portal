require 'spec_helper'
require 'messaging/transitions/to_message'
require 'messaging/message'

module Messaging
  describe TransitionList do
    describe 'transition_for' do
      it 'returns the first one in the simple case' do
        subject = TransitionList.from_data(["foo", "bar"])
        result = subject.transition_for(input: nil)

        expect(result.to).to eq("foo")
      end

      it 'returns the first one in the simple case using object structure' do
        subject = TransitionList.from_data([{ "to" => "foo"}, "bar"])
        result = subject.transition_for(input: nil)

        expect(result.to).to eq("foo")
      end
    end
  end
end
