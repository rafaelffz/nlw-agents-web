import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth';

type AuthProviders =
  | 'github'
  | 'apple'
  | 'discord'
  | 'facebook'
  | 'microsoft'
  | 'google'
  | 'huggingface'
  | 'spotify'
  | 'twitch'
  | 'twitter'
  | 'dropbox'
  | 'kick'
  | 'linkedin'
  | 'gitlab'
  | 'tiktok'
  | 'reddit'
  | 'roblox'
  | 'vk'
  | 'zoom'
  | (string & {});

export function useAuthSession() {
  return useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const session = await authClient.getSession();
      return session;
    },
  });
}

export function useAuthActions() {
  const queryClient = useQueryClient();

  const refetchSession = () => {
    queryClient.invalidateQueries({ queryKey: ['auth-session'] });
  };

  const signIn = async (provider: AuthProviders) => {
    await authClient.signIn.social({
      provider,
      callbackURL: window.location.origin,
    });
    refetchSession();
  };

  const signOut = async () => {
    await authClient.signOut();
    refetchSession();
  };

  return {
    signIn,
    signOut,
    refetchSession,
  };
}
