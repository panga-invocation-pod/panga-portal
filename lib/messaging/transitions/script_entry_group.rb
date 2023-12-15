require_relative './script_entry'

module Messaging
  module Transitions
    class ScriptEntryGroup
      def self.from_data(data)
        entries = data.map do |entry_data|
          ScriptEntry.from_data entry_data
        end

        new(entries)
      end

      def initialize(entries)
        @entries = entries
      end

      def transition_for(input, command_result = nil)
        entries.each do |entry|
          transition = entry.transition_for(input, command_result)
          return transition if transition
        end

        nil
      end

      private

      attr_reader :entries
    end
  end
end
