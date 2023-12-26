require_relative './transitions/script_entry'

module Messaging
  class ScriptEntryGroup
    def self.from_data(data)
      entries = data.map do |entry_data|
        Transitions::ScriptEntry.from_data entry_data
      end

      new(entries)
    end

    def initialize(entries)
      @entries = entries
    end

    def transition_for(context: nil, input:, command_result: nil)
      entries.each do |entry|
        transition = entry.transition_for(context: context, input: input, command_result: command_result)
        return transition if transition
      end

      nil
    end

    private

    attr_reader :entries
  end
end
