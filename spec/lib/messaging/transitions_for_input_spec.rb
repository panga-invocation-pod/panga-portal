require 'spec_helper'
require_relative 'messaging_helpers'
require 'messaging/transitions_for_input'

module Messaging
  describe TransitionsForInput do
    describe '#transition_for' do
      it 'follows direct match on text if found' do
        subject = TransitionsForInput.new('foo' => 'bar')
        expect(subject.transition_for(input: {'text' => 'foo'}).to).to eq('bar')
      end

      it 'follows default if text match not found' do
        subject = TransitionsForInput.new('foo' => 'bar', 'DEFAULT' => 'lala')
        expect(subject.transition_for(input: {'text' => 'moo'}).to).to eq('lala')
      end

      it 'follows error' do
        error = TestCommandFailure.new('someerror')
        subject = TransitionsForInput.new('foo' => 'bar', 'ERROR:someerror' => 'fromerror')
        expect(subject.transition_for(input: {'text' => 'moo'}, command_result: error).to).to eq('fromerror')
      end
    end
  end
end
