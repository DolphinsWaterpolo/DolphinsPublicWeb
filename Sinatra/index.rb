require 'rubygems'
require 'bundler/setup'
require 'sinatra'

get '/' do
  send_file File.expand_path('index.htm', settings.public_folder)
end