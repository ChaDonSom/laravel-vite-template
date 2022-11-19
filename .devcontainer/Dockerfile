FROM ubuntu:latest

RUN apt-get update && apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - 
RUN apt-get install -y nodejs

# Fix tzdata always hanging everything b/c it's forcing interaction
ENV TZ=America/New_York
ENV DEBIAN_FRONTEND=noninteractive
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && apt-get install -y tzdata

RUN apt-get update && apt-get install -y git

RUN apt-get update && apt-get install -y \
    software-properties-common \
    apt-transport-https \
    lsb-release \
    ca-certificates \
    wget

RUN add-apt-repository ppa:ondrej/php
RUN apt-get update && apt-get install -y \
    php8.0 \
    php8.0-fpm \
    php8.0-mysql \
    php8.0-bcmath \
    php8.0-curl \
    php8.0-dom \
    php8.0-intl

# RUN adduser code

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ARG USERNAME=code
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME --shell /usr/bin/bash \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# [Optional] Set the default user. Omit if you want to keep the default as root.
# USER $USERNAME

# mysql client
RUN apt-get update && apt-get install -y mysql-server