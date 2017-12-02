class BoothRegistry():
    """
        Set storing booth objects.
    """

    def __init__(self):
        self.booths = set()

    def add_booth(self, booth):
        self.booths.add(booth)

    def remove_booth(self, booth):
        self.booths.remove(booth)

    def show_booths(self):
        """
            Returns a list of public booths to be displayed in the
            FETCH_PUBLIC_BOOTHS view.
        """

        return [(b.creator, b.current_song, b.access_level) for b in self.booths
                if b.access_level == 'open' or b.access_level == 'password_protected']

    def join_booth(self, booth, dj):
        """
            Adds a new user to the given booth object's DJs dictionary.
        """
        # TODO: if authorized...
        booth.djs[dj.username] = {'booth_enqueue_count': booth.find_min(), 'queue': list()}

class Booth():
    """
        Booth session containing DJs and songs.
    """

    def __init__(self, creator, access_level):
        """
            Creates a new booth and inserts the booth's creator into the DJ
            list.
        """

        self.creator = creator.username
        self.access_level = access_level
        self.djs = {self.creator: {'booth_enqueue_count': 0, 'queue': list()}}
        self.dj_order = list(self.creator)
        self.current_dj = 0
        self.queue = list()
        self.current_song = None

    def add_dj(self, dj):
        """
            If user is not already in the booth, add them.
        """

        if dj.username not in self.djs:
            self.djs[dj.username] = {'booth_enqueue_count': 0, 'queue': list()}
            self.dj_order.append(dj.username)
        else:
            return "User is already in this booth's DJ pool."

    def remove_dj(self, dj):
        """
            If user has not already been removed form the booth, remove them.
        """

        if dj.username in self.djs:
            self.djs.pop(dj.username, None)
            self.dj_order.remove(dj.username)
        else:
            return "User has already left this booth's DJ pool."

    def dj_enqueue(self, dj, song):
        """
            Add a song to the user's personal queue...if this user is being
            waited on, resume dequeueing other users' personal queues.
        """
        # TODO: check if this user is the current user and find the next user

        dj = self.djs[dj.username]
        dj['queue'].append(song)
        dj['booth_enqueue_count'] += 1

    def dj_dequeue(self, dj):
        """
            Remove a song from a user's personal queue to put into the booth's
            queue.
        """

        return self.djs[dj.username]['queue'].pop(0)

    def booth_enqueue(self):
        """
            Put a user's choosen song into the booth's queue.
        """

        pass

    def find_min(self):
        """
            Get the minimum BOOTH_ENQUEUE_COUNT of all users in this booth.
        """

        return min([v['booth_enqueue_count'] for v in self.djs.values()])
