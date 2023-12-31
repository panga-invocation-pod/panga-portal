require_relative 'conditions/factory'

module Messaging
  class Command
    DEFAULT_STAGE = "response"
    VALID_STAGES = ["response", "request"]

    def self.from_data(data)
      return nil if data.nil?
      data = {"name" => data} if data.is_a?(String)

      self.new(
        name: data['name'],
        stage: data['stage'],
        input: data['input'],
        if_condition: Conditions::Factory.from_data(data["if"])
      )
    end

    def initialize(name:, stage: nil, input: nil, if_condition: nil)
      @name = name
      @stage = stage || DEFAULT_STAGE
      @input = input
      @if_condition = if_condition

      validate_stage(@stage)
    end

    attr_reader :name, :stage, :input, :if_condition

    def for_stage?(stage)
      validate_stage(stage)
      self.stage == stage
    end

    def valid_for?(stage, input:)
      for_stage?(stage) && valid?(input: input)
    end

    def valid?(input:nil)
      return true if if_condition.nil?

      if_condition.valid?(input: input)
    end

    private

    def validate_stage(stage)
      raise ArgumentError, "invalid stage for command" unless VALID_STAGES.include?(stage)
    end
  end
end
