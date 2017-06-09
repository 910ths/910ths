module Jekyll
	module Convertible

		def write(dest)

			path = destination(dest)
			FileUtils.mkdir_p(File.dirname(path))
			output.strip!

			if File.extname(path).downcase.eql? '.html'

				self.output = self.output.gsub(/\n/, '')
				self.output = self.output.gsub(/\t/, '')
				self.output = self.output.gsub(/\>\s+\</, '')

			end

			File.open(path, 'w') { |f| f.write(output) }

		end

	end
end