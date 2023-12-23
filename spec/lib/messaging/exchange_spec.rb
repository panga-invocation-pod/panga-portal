require 'spec_helper'
require_relative 'messaging_helpers'
require 'messaging/exchange'

module Messaging
  describe Exchange do
    include MessagingHelpers

    subject { Exchange.new(script: script, command_processor: processor) }
    let(:processor) { TestCommandProcessor.new }

    describe '#determine_response' do
      context 'with a single script' do
        let(:script) { load_script(:two_messages) }

        it 'find the next message for simple text input' do
          subject.user_input to: 'new_user?', input: { 'text' => 'yes' }
          message = subject.determine_response

          expect(message.id).to eq('whats_your_name?')
        end

        it 'find the entry message if no input is supplied' do
          message = subject.determine_response

          expect(message.id).to eq('new_user?')
        end
      end
    end

    describe '#process_response_commands' do
      let(:script) { load_script(:with_command) }

      describe "with a response command" do
        it "can explicitly specify command stage" do
          subject.user_input to: 'with_response_command', input: { 'text' => 'response text' }

          expect(processor.received_commands).to eq([['do_command', {'text' => 'response text'}]])
        end

        it 'sends commands to command processor' do
          subject.user_input to: 'with_command', input: { 'text' => 'I do not know' }

          expect(processor.received_commands).to eq([['have_existential_crisis', {'text' => 'I do not know'}]])
        end

        it 'makes the command result available for transitions' do
          processor.fail_with 'foobar'
          subject.user_input to: 'with_command', input: { 'text' => 'I do not know' }

          expect(subject.determine_response.id).to eq('foobar')
        end
      end

      describe "with a request command" do
        it "doesn't execute in response to input" do
          subject.user_input to: 'with_request_command', input: { 'text' => 'response text' }

          expect(processor.received_commands).to eq([])
        end
      end
    end
  end
end
