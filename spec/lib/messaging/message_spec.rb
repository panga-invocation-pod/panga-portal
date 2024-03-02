require 'spec_helper'
require_relative 'messaging_helpers'

require 'messaging/message'
require 'messaging/interpolator'

module Messaging
  describe Message do
    include MessagingHelpers

    describe '#transition_target' do
      context 'for a valid script' do
        it 'returns the id matching text input' do
          message = load_message(:two_messages, 'new_user?')
          input = {'text' => 'yes'}

          target = message.transition_for(input: input)

          expect(target.to).to eq('whats_your_name?')
        end

        it 'returns id for default by default' do
          message = load_message(:default_transition, 'first')
          input = {'text' => 'some bollocks'}

          target = message.transition_for(input: input)

          expect(target.to).to eq('second')
        end

        it 'uses the first transition if theres an array' do
          message = load_message(:default_transition, 'two_defaults')
          input = {'text' => 'some bollocks'}

          target = message.transition_for(input: input)

          expect(target.to).to eq('end1')
        end
      end
    end

    describe '#as_json' do
      it 'returns correct data' do
        message = load_message(:two_messages, 'new_user?')
        expect(message.as_json).to eq(
          id: 'new_user?',
          prompt: { prompt_type: "text", text: 'Welcome, are you new here?' },
          responder: {
            responder_type: 'select_option',
            options: [{text: "yes"}, {text: "no"}]
          }
        )
      end

      context 'with an interpolator' do
        let(:interpolator) { instance_double('Messaging::Interpolator') }

        it 'performs string interpolating using context' do
          allow(interpolator).to receive(:interpolate).with('Welcome back {{current_user.name}}').and_return('Welcome back Bob')
          allow(interpolator).to receive(:interpolate).with('yes').and_return('yes')
          allow(interpolator).to receive(:interpolate).with('no').and_return('no')

          message = load_message(:two_messages, 'new_user?')
          message.prompt = Prompt.from_data 'Welcome back {{current_user.name}}'

          expect(message.as_json(interpolator)[:prompt]).to eq({ prompt_type: "text", text: 'Welcome back Bob' })
        end
      end

      context 'with a character' do
        let(:character) { instance_double('Character', as_json: { name: 'Bob' }) }

        it 'includes character data in structured prompt if supplied for the script' do
          message = load_message(:two_messages, 'new_user?')
          expect(message.as_json(nil, { character: character })[:prompt][:character]).to eq(
            { name: 'Bob' }
          )
        end

        it 'includes a character in structured prompt if supplied for the prompt' do
          message = load_message(:prompt_variants, 'prompt_character')
          expect(message.as_json(nil, { character: character })[:prompt][:character]).to eq(
            { id: 'ralf', name: 'Ralf' }
          )
        end
      end

      context "with an object prompt" do
        it "finds the string prompt at the key text" do
          message = load_message(:prompt_variants, 'object_prompt')
          expect(message.as_json(nil)[:prompt]).to eq(
            { prompt_type: "text", text: "string prompt" }
          )
        end
      end

      context "with a list of prompts" do
        it "returns two string prompts" do
          message = load_message(:prompt_variants, 'two_string_prompts')
          expect(message.as_json(nil)[:prompt]).to eq(
            [
              { prompt_type: "text", text: "first string" },
              { prompt_type: "text", text: "second string" }
            ]
          )
        end

        it "finds the string prompt at the key text with two messages" do
          message = load_message(:prompt_variants, 'two_object_prompts')
          expect(message.as_json(nil)[:prompt]).to eq(
            [
              { prompt_type: "text", text: "first string" },
              { prompt_type: "text", text: "second string" }
            ]
          )
        end
      end
    end
  end
end
