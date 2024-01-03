module Commands
  class SetSessionAvailability
    def call(input, context)
      workshop = context.workshop
      raise ArgumentError unless workshop

      raise "Do something with input, #{input.inspect}"

      return nil
    end
  end
end